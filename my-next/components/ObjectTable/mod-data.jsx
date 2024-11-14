import useSWR from 'swr';
import { ObjectTable } from '.';
import { jsPhColumns } from './testTable';


export function ServerModification() {
    return <>
        ServerModification
        <Main />
    </>
}
const
    API_URL = 'http://localhost:3333/users',
    fetcher = async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Fetch ', + response.status);
        return response.json;
    }

function Main() {
    const
        { date, error, isLoading, isValidating, mutate } = useSWR(API_URL, fetcher);
    return <>
        <div style={{ position: 'absolute', fontSize: 'xxx-large' }}>
            {isLoading && <>⌛</>}
            {isValidating && <>👁‍🗨</>}
        </div>
        {error && <div className='error'> Error {error.toString()}</div>}
        {date && <ObjectTable data={date} columns={jsPhColumns} />}
    </>
}