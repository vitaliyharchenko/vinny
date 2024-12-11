import json
from django.core.management.base import BaseCommand
from ...models import Concept, ConceptRelation, Subject, ClassFromTag


class Command(BaseCommand):
    help = "Load concepts and relations from JSON files"

    # def add_arguments(self, parser):
    #     parser.add_argument(
    #         '--concepts',
    #         type=str,
    #         help="Path to the JSON file containing concepts",
    #         required=True
    #     )
    #     parser.add_argument(
    #         '--relations',
    #         type=str,
    #         help="Path to the JSON file containing concept relations",
    #         required=True
    #     )

    def handle(self, *args, **options):
        concepts_file = "fixtures/ai/concepts.json"
        relations_file = "fixtures/ai/concepts_relation.json"

        # Load concepts
        with open(concepts_file, 'r', encoding='utf-8') as f:
            concepts_data = json.load(f)

        # Load relations
        with open(relations_file, 'r', encoding='utf-8') as f:
            relations_data = json.load(f)

        # Step 1: Load Concepts
        self.stdout.write("Loading concepts...")
        for concept in concepts_data:
            subject, _ = Subject.objects.get_or_create(
                title=concept['subject'])
            class_tag, _ = ClassFromTag.objects.get_or_create(
                class_number=concept['class'],
                defaults={'title': f"{concept['class']} класс"}
            )

            concept_obj, created = Concept.objects.get_or_create(
                title=concept['title'],
                class_from=class_tag,
                defaults={
                    'is_active': False  # Можно включить по умолчанию
                }
            )
            concept_obj.subjects.add(subject)
            concept_obj.save()
            if created:
                print("Created relation: {parent.title} -> {child.title}")

        # Step 2: Load Relations
        self.stdout.write("Loading concept relations...")
        for relation in relations_data:
            try:
                parent = Concept.objects.get(pk=relation['parent'])
                child = Concept.objects.get(pk=relation['child'])
                ConceptRelation.objects.get_or_create(
                    parent=parent, child=child)
                print("Created relation: parent.title} -> {child.title}")
            except Concept.DoesNotExist as e:
                self.stderr.write(f"Error: {e}")

        self.stdout.write("Loading complete.")
