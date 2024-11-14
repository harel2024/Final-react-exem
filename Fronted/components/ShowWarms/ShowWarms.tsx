import React from 'react'
import { IUser } from '../../src/types/types'
// import "./ShowWarms.css";



interface Props {
    user: IUser
}

const ShowWarms: React.FC<Props> = ({user}) => {
  return (
    <div className="table-container">
        <h2>{user.organization}-{user.username}</h2>
    <table className="resource-table">
        <thead>
            <tr>
                <th>שם</th>
                <th>כמות</th>
                <th>סטטוס</th>
                <th>שיגור</th>
            </tr>
        </thead>
        <tbody>
            {user.resources?.map((resource) => (
                <tr key={resource.missile?.name}>
                    <td>{resource.missile?.name}</td>
                    <td>{resource.amount}</td>
                    <td>{"לא זמין"}</td>
                    <td>
                        <button className="launch-button" onClick={() => {}}>שיגור</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

  )
}

export default ShowWarms
