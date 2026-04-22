import json
from typing import Dict, List

from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        # Rooms keyed by project_id — each project has its own list of connected sockets
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, project_id: str):
        await websocket.accept()
        if project_id not in self.active_connections:
            self.active_connections[project_id] = []
        self.active_connections[project_id].append(websocket)
        print(f"[WS] Client connected to project room: {project_id}")

    def disconnect(self, websocket: WebSocket, project_id: str):
        if project_id in self.active_connections:
            if websocket in self.active_connections[project_id]:
                self.active_connections[project_id].remove(websocket)
        print(f"[WS] Client disconnected from project room: {project_id}")

    async def broadcast_to_project(self, project_id: str, message: dict):
        """Push a message to every browser connected to this project's room."""
        connections = self.active_connections.get(project_id, [])
        disconnected = []
        for websocket in connections:
            try:
                await websocket.send_json(message)
            except Exception:
                disconnected.append(websocket)
        # Clean up dead connections
        for ws in disconnected:
            self.active_connections[project_id].remove(ws)


# Single global instance — imported by routers
manager = ConnectionManager()
