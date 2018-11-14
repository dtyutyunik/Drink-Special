import React from 'react';

export default function Category(props){
  return(
    <div>
      {props.moreDetail.map(e=>{
        {console.log('detail DetailBreakdown  ', e.strDrink)}
        }
      )
    }
    </div>

    )
  }
