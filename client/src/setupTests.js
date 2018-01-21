// setupTests.js - create-react-app test setup

// allow use of jest-enzyme
import 'jest-enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
