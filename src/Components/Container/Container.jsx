export const Container = ({children}) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {children}
        </div>
    )
}