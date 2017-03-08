import React from 'react';

import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import { indigo400, indigo600, blue400, blue600, cyan400, cyan600 } from 'material-ui/styles/colors'


let HomePage = (props) => {
  return (
    <AutoRotatingCarousel
      label="Create An Account"
      landscape={true}
      mobile={true}
      style={{ position: 'inherit' }}
      open
      onStart={() => props.router.push('/signup')}
    >
      <Slide
        media={<img src="https://3.bp.blogspot.com/-Q-FGVuy8u_E/WL_v4ia23SI/AAAAAAAABGY/ar0GCle1iTI3Oo1xTVjorR6SK7fmPiYSgCLcB/s1600/333.png" className="homepage-image"/>}
        mediaBackgroundStyle={{ backgroundColor: blue400 }}
        contentStyle={{ backgroundColor: blue600 }}
        title="This is a very cool feature"
        subtitle="Just using this will blow your mind."
      />
      <Slide
        media={<img src="https://4.bp.blogspot.com/-IGavdJ5Zss4/WL_vvMhwRoI/AAAAAAAABGM/m8Q8a4Z5Lvs5qEG5rpoCC7NYHhmP2VeHwCLcB/s1600/111.png" className="homepage-image"/>}
        mediaBackgroundStyle={{ backgroundColor: blue400 }}
        contentStyle={{ backgroundColor: blue600 }}
        title="Ever wanted to be popular?"
        subtitle="Well just mix two colors and your are good to go!"
      />
    </AutoRotatingCarousel>
  );
};

export default HomePage;
