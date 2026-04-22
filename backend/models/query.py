class Query(Base):
    __tablename__ = "queries"

    id = Column(UUID, primary_key=True)
    project_id = Column(UUID, ForeignKey("projects.id"))

    user_id = Column(UUID, ForeignKey("users.id"))

    question = Column(Text)
    answer = Column(Text, nullable=True)

    status = Column(String, default="open")  # open/resolved

    created_at = Column(DateTime, default=datetime.utcnow)
