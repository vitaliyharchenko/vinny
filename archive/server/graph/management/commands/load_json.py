from django.core.management.base import BaseCommand, CommandError
from graph.models import Node, Concept
import json

class Command(BaseCommand):
    help = 'Processes a JSON file'

    def handle(self, *args, **options):
        try:
            with open('graph/fixtures/graph_quadratic.json', 'r', encoding='utf-8') as file:
                data = json.load(file)
                concept_instance = Concept.objects.get(pk=1)
                for obj in data:
                    node = Node.objects.create(
                        title=obj["title"],
                        type = obj["type"],
                        concept = concept_instance
                    )
        except FileNotFoundError:
            raise CommandError(f"File does not exist")
        except json.JSONDecodeError:
            raise CommandError(f"Error decoding JSON from file")

        self.stdout.write(self.style.SUCCESS('Successfully processed JSON file'))