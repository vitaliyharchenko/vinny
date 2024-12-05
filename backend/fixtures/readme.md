для очистки базы и постановки данных заново:

1. python manage.py flush
2. python manage.py loaddata fixtures/methodics_base.json
3. python manage.py loaddata fixtures/methodics_concepts.json
4. python manage.py loaddata fixtures/graph_nodes.json
5. python manage.py loaddata fixtures/graph_edges.json
