import React from 'react'
import {CardTop, HeadingH, ParagraphDescription, ButtonM} from './StylingConst';

function CardTops({CardTopHeading, onClick, CardTopDescription, CarTopButton, CardTopBelow, href}) {
  return (
    <CardTop>
        <HeadingH>{CardTopHeading}</HeadingH>
        <ParagraphDescription>
          {CardTopDescription}
        </ParagraphDescription>
        <ButtonM onClick={onClick}><a href={href}> {CarTopButton} </a></ButtonM>
        <ParagraphDescription>{CardTopBelow}</ParagraphDescription>
    </CardTop>
  )
}

export default CardTops
