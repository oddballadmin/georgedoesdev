
type FrameProps = {
    children: React.ReactNode;

}
export const Frame = ({children}:FrameProps) => {
    return (
        <div className="">
            {children}
        </div>
    )
}