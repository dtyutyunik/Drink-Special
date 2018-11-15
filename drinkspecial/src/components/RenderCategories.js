import React from 'react';

export default function RenderCategories(props) {

  return (props.categories.map(e => {

    return <button key={e} onClick={() => props.showInfo(e.strCategory)} id={e.strCategory}>

      {e.strCategory}
    </button>
  }))
}
