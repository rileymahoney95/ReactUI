import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import './setupTests.js';
import axios from 'axios';

import App from '../components/App';
import Main from '../components/Main/Main';
import Page from '../components/Page/Page';
import Header from '../components/Header/Header';
import { createBrowserHistory } from 'history';

jest.mock("axios");

describe("<App /> Component", () => {
    it('renders App without crashing', () => {
        const mockConfigData = {   
        data: { 
            SSO_URL: "test", 
            SSO_CLIENT_ID: "1234", 
            FLOW_PATH_URL: "https://example.com" 
            }
        };
        axios.get = () => new Promise(resolve => resolve(mockConfigData));
        const history = createBrowserHistory();
        const output = shallow(
            <App history={history}/>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});

describe("<Main /> Component", () => {
    it('renders Main without crashing', () => {
        const output = shallow(
            <Main />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    
});

describe("<Header /> Component", () => {
    it('renders Header without crashing', () => {
        const output = shallow(
            <Header />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});

describe("<Page /> Component", () => {

    it('renders Page without crashing', () => {
        const output = shallow(
            <Page />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('enables upload button on file drop', () => {
        const page = shallow(
            <Page />
        );
        expect(page.state().uploadDisabled).toEqual(true);
        page.instance().handleDrop(page.state().files);
        expect(page.state().uploadDisabled).toEqual(false);
    });

    it('disables upload button on upload button click', () => {
        const page = shallow(
            <Page />
        );
        page.setState({
            uploadDisabled: false
        });
        page.instance().showResponse({ invalidRecords: 0, message: "Your upload has been submitted.", validRecords: 3 }, 200);
        expect(page.state().uploadDisabled).toEqual(true);
    });

    it('shows success banner for file with all valid records', () => {
        const page = shallow(
            <Page />
        );
        page.instance().showResponse({ invalidRecords: 0, message: "Your upload has been submitted.", validRecords: 3 }, 200);
        expect(page.state().bannerType).toBe("banner success");
    });

    it('shows warning banner for file with some valid records', () => {
        const page = shallow(
            <Page />
        );
        page.instance().showResponse({ invalidRecords: 2, message: "Your upload has been submitted.", validRecords: 1 }, 200);
        expect(page.state().bannerType).toBe("banner warning");
    });

    it('shows error banner for file with no valid records', () => {
        const page = shallow(
            <Page />
        );
        page.instance().showResponse({ message: "Error: Cannot parse uploaded file." }, 422);
        expect(page.state().bannerType).toBe("banner error");
    });

});