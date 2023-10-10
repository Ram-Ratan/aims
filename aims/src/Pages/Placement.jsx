import React,{useState} from 'react'



const Placement = () => {
    const [placement,setPlacement] = useState('batch-2020-24')
  return (
    <div>
        <h1 className='w-[250px] h-12 bg-gradient-to-r from-[#ed1f71] to-[#ff4710] text-xl rounded-lg flex justify-center items-center py-2 m-auto mt-4 font-semibold'>Placement Section</h1>
        <div className=' border-black rounded border-2 w-[500px] h-[500px] p-6 m-8'>
            <select 
                id='placement'
                name='placement'
                className="w-full border-2 px-2 py-2 rounded border-gray-400 focus:border-blue-500 focus:border-2 font-serif"
                onChange = {(e) => setPlacement(e.target.value)}
                value={placement}
            >
                <option value='batch-2020-24'>Batch 2020-24</option>
                <option value='batch-2019-23'>Batch 2019-23</option>
                <option value='batch-2018-22'>Batch 2018-22</option>
                <option value='batch-2017-21'>Batch 2017-21</option>
            </select>
        </div>
    </div>
  )
}

export default Placement