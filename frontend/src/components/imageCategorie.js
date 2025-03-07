import React from 'react';

const ImageCategorie = ({ category }) => {
    const getImageByCategory = (category) => {
        switch (category) {
            case 'jardinage':
                return{ src: '${process.env.PUBLIC_URL}/image/jardinierDiapo.jpg'
                };
            case 'technology':
                return 'path/to/technology-image.jpg';
            case 'fashion':
                return 'path/to/fashion-image.jpg';
            default:
                return 'path/to/default-image.jpg';
        }
    };

    return (
        <div>
            <img src={getImageByCategory(category)} alt={category} />
        </div>
    );
};

export default ImageCategorie;