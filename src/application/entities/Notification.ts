type NotificationProps = {
    recipientId: string;
    content: string;
    category: string;
    readAt?: Date | null;
    createdAt: Date;
}

export class Notification {
    private props: NotificationProps

    constructor(props: NotificationProps) {
        this.props = props;
    }

    public set recipientId(recipientId: string) {
        this.props.recipientId = recipientId;
    }

    public get recipientId() {
        return this.props.recipientId;
    }

    public set content(content: string) {
        this.props.content = content;
    }

    public get content() {
        return this.props.content;
    }

    public set category(category: string) {
        this.props.category = category;
    }

    public get category() {
        return this.props.category;
    }

    public set readAt(readAt: Date | undefined | null) {
        this.props.readAt = readAt;
    }

    public get readAt(): Date | undefined | null {
        return this.props.readAt;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }
}