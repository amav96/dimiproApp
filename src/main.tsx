import ReactDOM from 'react-dom/client'
import App from './App'
import  './assets/css/index.scss'
import  './assets/css/tailwind.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        <ConfigProvider
            theme={{
                components: {
                Button: {
                    colorPrimary: '#531dab',
                    algorithm: true, // Enable algorithm
                    },
                },
            }}
        >
            <App/>
        </ConfigProvider>
        <ToastContainer />
    </Provider>
)
