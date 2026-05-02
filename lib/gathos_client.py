import base64
import time
from pathlib import Path

import requests

from lib.config import (
    GATHOS_API_KEY,
    GATHOS_BASE_URL,
    GATHOS_IMAGE_HEIGHT,
    GATHOS_IMAGE_WIDTH,
    GATHOS_MAX_RETRIES,
    GATHOS_POLL_INTERVAL,
    GATHOS_TIMEOUT,
    GATHOS_TTS_POLL_INTERVAL,
)


def _headers():
    return {"x-api-key": GATHOS_API_KEY, "Content-Type": "application/json"}


def _retry(fn, max_retries=GATHOS_MAX_RETRIES):
    for attempt in range(max_retries):
        try:
            return fn()
        except (requests.HTTPError, requests.ConnectionError) as e:
            if attempt == max_retries - 1:
                raise
            wait = 5 * (attempt + 1)
            print(f"  Retry {attempt+1}/{max_retries} in {wait}s: {e}")
            time.sleep(wait)


def submit_image_job(prompt: str, width: int = GATHOS_IMAGE_WIDTH, height: int = GATHOS_IMAGE_HEIGHT) -> str:
    def _submit():
        resp = requests.post(
            f"{GATHOS_BASE_URL}/images/generate",
            headers=_headers(),
            json={"prompt": prompt, "width": width, "height": height},
            timeout=30,
        )
        resp.raise_for_status()
        return resp.json()["job_id"]
    return _retry(_submit)


def poll_image_job(job_id: str) -> str:
    start = time.time()
    while time.time() - start < GATHOS_TIMEOUT:
        resp = requests.get(f"{GATHOS_BASE_URL}/images/status/{job_id}", headers=_headers(), timeout=15)
        resp.raise_for_status()
        data = resp.json()
        if data.get("status") == "completed":
            return data["result"]
        if data.get("status") == "failed":
            raise RuntimeError(f"Image job {job_id} failed: {data.get('error')}")
        time.sleep(GATHOS_POLL_INTERVAL)
    raise TimeoutError(f"Image job {job_id} timed out after {GATHOS_TIMEOUT}s")


def generate_image(prompt: str, output_path: Path, width: int = GATHOS_IMAGE_WIDTH, height: int = GATHOS_IMAGE_HEIGHT) -> Path:
    output_path = Path(output_path)
    if output_path.exists() and output_path.stat().st_size > 0:
        print(f"  Skipping (exists): {output_path.name}")
        return output_path
    job_id = submit_image_job(prompt, width, height)
    b64 = poll_image_job(job_id)
    output_path.write_bytes(base64.b64decode(b64))
    print(f"  Saved: {output_path.name}")
    return output_path


def generate_images_batch(prompts: list[dict], output_dir: Path) -> list[Path]:
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    jobs = []
    for p in prompts:
        out = output_dir / p["filename"]
        if out.exists() and out.stat().st_size > 0:
            print(f"  Skipping (exists): {out.name}")
            jobs.append({"path": out, "job_id": None})
            continue
        w = p.get("width", GATHOS_IMAGE_WIDTH)
        h = p.get("height", GATHOS_IMAGE_HEIGHT)
        job_id = submit_image_job(p["prompt"], w, h)
        print(f"  Submitted: {out.name} → {job_id}")
        jobs.append({"path": out, "job_id": job_id})
        time.sleep(0.5)

    results = []
    for j in jobs:
        if j["job_id"] is None:
            results.append(j["path"])
            continue
        b64 = poll_image_job(j["job_id"])
        j["path"].write_bytes(base64.b64decode(b64))
        print(f"  Saved: {j['path'].name}")
        results.append(j["path"])
    return results


def submit_tts_job(text: str, voice: str) -> str:
    def _submit():
        resp = requests.post(
            f"{GATHOS_BASE_URL}/tts/generate",
            headers=_headers(),
            json={"text": text, "voice": voice},
            timeout=30,
        )
        resp.raise_for_status()
        return resp.json()["job_id"]
    return _retry(_submit)


def poll_tts_job(job_id: str) -> str:
    start = time.time()
    while time.time() - start < GATHOS_TIMEOUT:
        resp = requests.get(f"{GATHOS_BASE_URL}/tts/status/{job_id}", headers=_headers(), timeout=15)
        resp.raise_for_status()
        data = resp.json()
        if data.get("status") == "completed":
            return data["result"]
        if data.get("status") == "failed":
            raise RuntimeError(f"TTS job {job_id} failed: {data.get('error')}")
        time.sleep(GATHOS_TTS_POLL_INTERVAL)
    raise TimeoutError(f"TTS job {job_id} timed out after {GATHOS_TIMEOUT}s")


def generate_tts(text: str, voice: str, output_path: Path) -> Path:
    output_path = Path(output_path)
    if output_path.exists() and output_path.stat().st_size > 0:
        print(f"  Skipping (exists): {output_path.name}")
        return output_path
    job_id = submit_tts_job(text, voice)
    b64 = poll_tts_job(job_id)
    output_path.write_bytes(base64.b64decode(b64))
    print(f"  Saved: {output_path.name}")
    return output_path
