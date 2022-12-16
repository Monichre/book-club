import { Image } from '@nextui-org/react';

export const GoogleBooks = ({ currentBook, handlePreviewLoaded }: any) => {
  return (
    <div style={{ height: '500px', width: '500px' }}>
      {currentBook && (
        <Image
          src={currentBook.volumeInfo.imageLinks.thumbnail}
          objectFit='contain'
          showSkeleton
          width={'100%'}
          height={'100%'}
        />
      )}
    </div>
  )
}
