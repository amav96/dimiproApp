import React from 'react'
import { Router } from '../../router';

export function Web() {
  return (
    <main className="AppMain__layer__PageAndTopBar">
        <div className="HomePageContent">
          <div
            className="Scrollable--vertical
          HomePageContent__contentContainer"
          >
            <Router />
          </div>
        </div>
    </main>
  )
}
