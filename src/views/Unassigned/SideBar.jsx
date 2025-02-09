import React from 'react'
import {Column, SideBar, CardTop, HeadingH, Paragraph} from './StylingConst';

function SideBars({SideBarHeading, SideBarHeadingPargraph, users}) {
  return (
    <Column>
        <SideBar>
            <CardTop>
                <HeadingH>{SideBarHeading}</HeadingH>
                {users}
                <Paragraph>
                    {SideBarHeadingPargraph}
                </Paragraph>
            </CardTop>
        </SideBar>

    </Column>
  )
}

export default SideBars
