import {PrimeReactProvider} from 'primereact/api';
// import "primereact/resources/themes/arya-orange/theme.css";
import 'primereact/resources/themes/lara-dark-amber/theme.css'
export const metadata = {
    title: 'Quiz Mania',
    description: 'For MSBTE CO-6I Students',
}

export default function AdminLayout({children}) {
    return (
        <PrimeReactProvider>
            {children}
        </PrimeReactProvider>
    )
}
