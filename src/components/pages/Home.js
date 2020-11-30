import React from 'react';
import Section from '../Section';
import Policies from './Policies';
import Charts from './Charts';

function Home() {
    const welcome = {
        lightBg: false,
        lightText: true,
        lightTextDesc: true,
        topLine: 'AUTOMATE POLICY FINDING',
        headline: 'The best policy for you is just a few clicks away!',
        description:
            "Search and Edit policy details",
        buttonLabel: 'View policies',
        imgStart: '',
        img: 'svg-4.svg',
        alt: 'Policy'
    };
    return (
        <>
            <Section {...welcome} />
            <Policies />
            <Charts />
        </>
    );
}

export default Home;