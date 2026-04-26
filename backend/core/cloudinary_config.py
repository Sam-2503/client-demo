"""Cloudinary configuration and utilities for image upload"""
import cloudinary
import cloudinary.uploader
from config import settings


def init_cloudinary():
    """Initialize Cloudinary with credentials from environment variables"""
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True
    )


def upload_image(file_bytes: bytes, filename: str, folder: str = "rjs-homes/updates") -> dict:
    """
    Upload an image to Cloudinary
    
    Args:
        file_bytes: Image file content as bytes
        filename: Original filename
        folder: Cloudinary folder path
    
    Returns:
        dict with 'url' and 'public_id' keys
    """
    result = cloudinary.uploader.upload(
        file_bytes,
        folder=folder,
        public_id=filename.split('.')[0],
        resource_type="auto",
        overwrite=False
    )
    
    return {
        "url": result.get("secure_url"),
        "public_id": result.get("public_id"),
        "format": result.get("format")
    }


def delete_image(public_id: str) -> bool:
    """Delete an image from Cloudinary"""
    try:
        cloudinary.uploader.destroy(public_id)
        return True
    except Exception:
        return False
