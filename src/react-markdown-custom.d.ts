import 'react-markdown/lib/complex-types'

declare module 'react-markdown/lib/complex-types' {
    interface CustomComponents {
        hint: React.FC<{ children: string }>
        warning: React.FC<{ children: string }>
        note: React.FC<{ children: string }>
        recap: React.FC<{ children: string }>
        example: React.FC<{ children: string }>
        solution: React.FC<{ children: string }>
    }
}
