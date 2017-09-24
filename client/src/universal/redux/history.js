// import createHistory from 'history/createBrowserHistory';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
export default process.env.__CLIENT__ ? createBrowserHistory() : createMemoryHistory();
// export default createHistory();