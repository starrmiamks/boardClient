import React, { FC } from 'react';

type HomeProps = {};

const Home: FC<HomeProps> = (props) => {
    return (
        <div className='intro'>
            <h5 id='Intro' style={{ marginTop: '5rem' }}>
                Welcome to Board! 
                <br />
                <br />
                Share your favorite charcuterie, dessert, breakfast, snack or veggie board and find inspiration to create new ones!
            </h5>
        </div>
    );
};

export default Home;