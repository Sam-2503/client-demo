export default function ProjectCard({ project }: any) {
  return (
    <a href={`/project/${project.id}`}>
      <div className="card">
        <div style={{ fontSize: 18 }}>{project.name}</div>

        <div style={{ color: "#888", marginTop: 5 }}>
          Progress: {project.overall_progress}%
        </div>

        <div
          style={{
            marginTop: 10,
            height: 6,
            background: "#222",
          }}
        >
          <div
            style={{
              width: `${project.overall_progress}%`,
              background: "#C8971F",
              height: "100%",
            }}
          />
        </div>
      </div>
    </a>
  );
}
