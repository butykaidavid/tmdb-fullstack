FROM python:3.11-slim
WORKDIR /app
COPY pyproject.toml /app/pyproject.toml
RUN pip install -U pip && pip install -e . --no-deps || true
COPY src /app/src
ENV PYTHONPATH=/app/src
CMD ["python","-m","etl.cli"]
