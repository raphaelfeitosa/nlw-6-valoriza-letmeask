import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';
import { ContainerQuestion } from './styles';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false
}: QuestionProps): ReactElement {
    return (
        <ContainerQuestion
            className={cx(
                'question',
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered }
            )}
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </ContainerQuestion>
    )
}

export { Question };