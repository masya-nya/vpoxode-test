<template>
	<q-page padding>
		<div class="t-flex t-justify-between t-items-center t-mb-4">
			<q-input
				v-model="filters.name"
				label="Фильтр по имени"
				@input="updateQueryParams"
				class="t-w-1/4"
			/>
			<q-input
				v-model="filters.email"
				label="Фильтр по email"
				@input="updateQueryParams"
				class="t-w-1/4"
			/>
			<q-select
				v-model="perPage"
				:options="perPageOptions"
				label="Элементов на странице"
				@input="updateQueryParams"
				class="t-w-1/6"
			/>
		</div>

		<div class="t-grid t-grid-cols-1 t-md:grid-cols-2 t-lg:grid-cols-3 t-gap-4">
			<q-card
				v-for="user in users"
				:key="user.id"
				class="t-my-2"
			>
				<q-card-section>
					<q-avatar>
						<img
							:src="user.avatar"
							alt="User Avatar"
							class="t-w-full t-h-40 t-object-cover"
						/>
					</q-avatar>


					<div class="t-text-lg t-font-bold">{{ user.first_name }} {{ user.last_name }}</div>
					<div>{{ user.email }}</div>
				</q-card-section>
			</q-card>
		</div>

		<div class="t-flex t-justify-between t-items-center t-mt-6">
			<q-btn
				@click="loadMore"
				label="Показать ещё"
				:disable="!hasMore"
			/>
			<q-pagination
				v-model="currentPage"
				:max="totalPages"
				@update:model-value="fetchData"
			/>
		</div>
	</q-page>
</template>

<script
	lang="ts"
	setup
>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const perPageOptions = [2, 5, 10, 20]
const perPage = ref(perPageOptions[1])
const currentPage = ref(1)
const totalPages = ref(0)
const users = ref<{ id: number, avatar: string, email: string, first_name: string, last_name: string }[]>([])
const filters = ref({ name: '', email: '' })
const hasMore = ref(true)

const router = useRouter()
const route = useRoute()

// Функция для получения данных с API
async function fetchData(page = currentPage.value) {
	const params = {
		page,
		per_page: perPage.value,
		name: filters.value.name,
		email: filters.value.email,
	}

	try {
		const { data } = await axios.get('https://reqres.in/api/users', { params })
		users.value = data.data
		totalPages.value = data.total_pages
		hasMore.value = currentPage.value < totalPages.value
	} catch (error) {
		console.error('Ошибка при получении данных:', error)
	}
}

// Загрузка дополнительных данных (при клике на "Показать ещё")
async function loadMore() {
	if (hasMore.value) {
		currentPage.value++
		await fetchData()
	}
}

// Обновление query-параметров при изменении фильтров или пагинации
function updateQueryParams() {
	const queryParams: Record<string, string | number> = {
		page: currentPage.value,
		per_page: perPage.value,
	}

	if (filters.value.name) queryParams.name = filters.value.name
	if (filters.value.email) queryParams.email = filters.value.email

	router.replace({ query: queryParams })
}

// Учет данных из query-параметров при загрузке страницы
onMounted(() => {
	const query = route.query

	if (query.page) currentPage.value = Number(query.page)
	if (query.per_page) perPage.value = Number(query.per_page)
	if (query.name) filters.value.name = query.name as string
	if (query.email) filters.value.email = query.email as string

	fetchData()
})

// Перезапрос данных при изменении фильтров, пагинации или количества элементов на странице
watch([currentPage, perPage, filters], () => {
	console.log(1);
	fetchData()
	updateQueryParams()
})
</script>

<style scoped>
/* Добавить стили при необходимости */
</style>