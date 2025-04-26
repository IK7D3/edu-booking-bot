import React from 'react'
import TeacherItem from './TeacherItem' // مسیر صحیح به این فایل
// اگه داخل همون پوشه components هستی این درسته، اگر نه مسیرش رو تنظیم کن

const Teachers = () => {
  const teachersList = [
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
    { name: 'علی‌محمد لطیف', title: 'استاد، هیأت علمی فعال', imageUrl: 'https://picsum.photos/250/256' },
  ];

  return (
    <div className="overflow-y-auto" style={{ height: 'calc(100vh - 80px)' }}>
      <ul className="max-w-md divide-y p-5">
        {teachersList.map((teacher, index) => (
          <TeacherItem
            key={index}
            name={teacher.name}
            title={teacher.title}
            imageUrl={teacher.imageUrl}
          />
        ))}
      </ul>
    </div>
  )
}

export default Teachers
