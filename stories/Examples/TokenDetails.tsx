import { useIdToken } from '../../src';

export function TokenDetails() {
    const token = useIdToken();

    if (token === null) {
        return null;
    } else {
        const {
            credential,
            select_by
        } = token;

        return (
            <table style={{ tableLayout: 'fixed', width: 600 }}>
                <thead>
                <tr>
                    <th>Credential</th>
                    <th>Select By</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>
                        <div style={{ maxHeight: '200px', overflow: 'auto' }}>{credential}</div>
                    </td>
                    <td>{select_by}</td>
                </tr>
                </tbody>
            </table>
        );
    }
}
