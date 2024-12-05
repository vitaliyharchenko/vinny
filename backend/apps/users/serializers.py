from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    parents = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all(), required=False)

    class Meta:
        model = User
        fields = ['pk', 'username', 'first_name',
                  'last_name', 'role', 'additional_info', 'parents']
        read_only_fields = ['pk']

    def update(self, instance, validated_data):
        parents_data = validated_data.pop('parents', [])
        instance = super().update(instance, validated_data)
        if parents_data is not None:
            instance.parents.set(parents_data)
        instance.save()
        return instance

    def create(self, validated_data):
        parents_data = validated_data.pop('parents', [])
        user = User.objects.create(**validated_data)
        user.parents.set(parents_data)
        user.save()
        return user
