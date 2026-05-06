import React, { useState } from 'react';
import Banner from '../banner/Banner';
import CommunitySection from '../communitySection/CommunitySection';
import OurActiveMembers from '../ourActiveMembers/OurActiveMembers';
import Posts from '../../components/user/Posts';
import AllPosts from '../../components/user/AllPosts';



const Home = () => {

    const [searchQuery, setSearchQuery] = useState("");


    return (
        <div>

            <Banner setSearchQuery={setSearchQuery}></Banner>


            {searchQuery ? (
                <AllPosts
                    sort="latest"
                    page={1}
                    selectedTag={searchQuery}
                />
            ) : (
                <Posts />
            )}

            {/* <Posts></Posts> */}
            <CommunitySection></CommunitySection>
            <OurActiveMembers></OurActiveMembers>


        </div>
    );
};

export default Home;