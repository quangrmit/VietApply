FROM pgvector/pgvector:pg15

ENV POSTGRES_USER devuser
ENV POSTGRES_PASSWORD devpassword
ENV POSTGRES_DB devdb

EXPOSE 5432

COPY mock.sql /docker-entrypoint-initdb.d

