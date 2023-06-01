import tw from 'tailwind-styled-components'

export default function Banner() {
    return(
        <StyledBanner>
            <div>광고자리</div>
        </StyledBanner>
    )
}

const StyledBanner = tw.aside`
    border
    border-slate-200
    w-20
    h-full
    flex
    justify-center	
    items-center
`