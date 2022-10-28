
type Stack = {
    title: string
    content: string
    link: string
}[]

export const fetchStack: () => Promise<Stack> = async () => {

    const stack = [
        {
            title: 'React Query',
            content: 'A powerful data-fetching react library made for easily syncing your client-server state.',
            link: 'https://tanstack.com/query/v4/docs/overview'
        },
        {
            title: 'Tailwind CSS',
            content: 'Utility-first CSS framework that speeds up your development without taking away any power from you.',
            link: 'https://tailwindcss.com/'
        },
        {
            title: 'Zustand',
            content: 'Non-opinionated, fast and simple state-management solution for managing your application state.',
            link: 'https://docs.pmnd.rs/zustand/getting-started/introduction'
        },
        {
            title: 'React Router',
            content: 'This project comes with File-System Routing pre-configured, powered by React Router DOM.',
            link: 'https://reactrouter.com/en/main/start/tutorial'
        },
    ];

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(stack), 2500)
    })
}