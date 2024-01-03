import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import React from 'react'
import '@/css/front.css'
export default function FaqInfo({page}) {
  return (
    <FrontLayout>
       <PageTitle title={page?.titre??''} head={false}>
        <FrontBreadcrumbs pages={[{ 'url': route("front.faqs"), 'page': ("Forum aux questions") },{ 'url': "", 'page': (page?.titre??'') }]} />

        </PageTitle>
    <div className="bg-slate-50_ shadow-inner mt-[1px]">
      <div className="max-w-screen-xl mx-auto px-4 ">
       <div className="max-w-screen-md mx-auto">
        <div className="">
           <h1 className="text-3xl lg:text-5xl text-center xl py-8 font-bold">
            {page?.titre}
            </h1> 
        </div>
        <div className="p-4 text-md mb-8 text-justify text-lg html">
        <div dangerouslySetInnerHTML={{__html:page?.contenu}}></div>

        </div>
       </div>
      </div>
    </div>
  </FrontLayout>
  )
}
