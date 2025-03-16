import {notFound} from 'next/navigation'
import ModalBackdrop from '@/components/modal-backdrop'
import {getNewsItem} from '@/lib/news'

export default async function InterceptedImagePage({params}) {
  const {slug} = await params
  const newsItem = await getNewsItem(slug)

  if (!newsItem) {
    notFound()
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  )
}
