import json

input_file = 'graph_nodes.json'
output_file = 'graph_nodes_1.json'

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    fields = item.get('fields', {})

    # Преобразуем subject -> subjects
    if 'subject' in fields:
        subject_value = fields.pop('subject')
        fields['subjects'] = [subject_value]

    # Преобразуем concept -> concepts
    if 'concept' in fields:
        concept_value = fields.pop('concept')
        fields['concepts'] = [concept_value]

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Готово! Обновленные данные сохранены в", output_file)
