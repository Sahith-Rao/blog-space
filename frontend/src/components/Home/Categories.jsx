import { Button,Table, TableBody, TableCell, TableHead, TableRow,styled } from "@mui/material"
import { categories } from "../../constants/data";
import { Link, useSearchParams} from "react-router-dom";

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    return (
        <>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>
            <StyledTable>
                <TableHead>
                    <TableCell>

                        <Link to = ''>
                            All Categories
                        </Link>
                    </TableCell>
                </TableHead>
                <TableBody>
                {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                <Link to={`/?category=${category.type}`}>
                                        {category.type}
                                </Link>
                                    
                                </TableCell>
                            </TableRow>
                        ))
                }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;