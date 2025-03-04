docker exec -it dev_postgres psql -U devuser -d devdb

## Dump command
psql --username=devuser devdb < mock-data.sql