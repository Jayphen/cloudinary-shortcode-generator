import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CloudinaryContext } from 'cloudinary-react';
import GalleryItem from './GalleryItem';

const Gallery = ({onDragEnd, galleryItems, handleAltChange, handleCaptionChange}) =>
  // React dnd is truly a mess
  <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_NAME}>
    <DragDropContext onDragEnd  = {onDragEnd} >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {galleryItems.map((data) => (
              <Draggable key={data.public_id} draggableId={data.public_id}>
                {(provided, snapshot) => (
                  <div>
                    <div ref={provided.innerRef}>
                      <GalleryItem
                        id={data.public_id}
                        key={data.public_id}
                        handleAltChange={handleAltChange}
                        handleCaptionChange={handleCaptionChange}
                        showFields={true}
                        provided={provided}
                        snapshot={snapshot}
                      />
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </CloudinaryContext>

export default Gallery;
