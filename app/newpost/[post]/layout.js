import React from 'react'

export default function postLayout ({children}) {
  return children
}

// function name should be - generateMetadata only
export async function generateMetadata({params}) {
  return {
    title:params.post.split('-').join(' ')
  }
}