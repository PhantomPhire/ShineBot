export class ServedGuildSaveState {
    public Id: string;
    public BoundVoiceChannelId?: string;
    public FeedbackChannelId?: string;

    constructor(id: string, boundVoiceChannelId?: string, feedbackChannelId?: string) {
        this.Id = id;
        this.BoundVoiceChannelId = boundVoiceChannelId;
        this.FeedbackChannelId = feedbackChannelId;
    }
}