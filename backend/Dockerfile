FROM python:3.10

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /portfolio_app/backend

# Copy the requirements file first to avoid unnecessary cache invalidation
COPY requirements.txt /portfolio_app/backend/

# Install PostgreSQL client and other necessary dependencies
RUN apt-get update \
    && apt-get install -y libpq-dev postgresql-client \
    && pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . /portfolio_app/backend/
COPY ../wait-for-db.sh /portfolio_app/backend/

# Make sure the wait-for-db.sh script is executable
RUN chmod +x /portfolio_app/backend/wait-for-db.sh

CMD ["sh", "-c", "./wait-for-db.sh db && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
