import React from 'react';
import Banner from '../banner/Banner';
import CommunitySection from '../communitySection/CommunitySection';
import OurActiveMembers from '../ourActiveMembers/OurActiveMembers';
import Posts from '../../components/user/Posts';



const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            
            <Posts></Posts>
            <CommunitySection></CommunitySection>
            <OurActiveMembers></OurActiveMembers>


        </div>
    );
};

export default Home;