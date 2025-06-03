import BookingList from '@/app/components/admin/BookingList'
import ServiceList from '@/app/components/admin/ServiceList'

export default function AdminPage() {
	return (
		<div className='max-w-3xl mx-auto py-6'>
			<h1 className='text-2xl font-bold mb-4'>Админ-панель</h1>
			<BookingList />
			<ServiceList />
		</div>
	)
}