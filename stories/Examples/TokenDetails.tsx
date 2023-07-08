import { useIdToken } from '../../src';
import jwt_decode from 'jwt-decode';

export function TokenDetails() {
    const token = useIdToken();

    if (token === null) {
        return null;
    } else {
        const {
            credential,
            select_by
        } = token;

        const jwt = jwt_decode(credential);

        return (
            <table style={{ tableLayout: 'fixed', width: 900 }}>
                <colgroup>
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '85%' }} />
                </colgroup>

                <thead>
                <tr>
                    <th>Select By</th>
                    <th>Credential</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>{select_by}</td>
                    <td>
                        <pre style={{ maxHeight: '400px', overflow: 'auto', padding: '0.5em 0' }}>
                            <code>{JSON.stringify(jwt, null, 2)}</code>
                        </pre>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}
