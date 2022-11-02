import {CreateTagDto} from "./dto/create-tag.dto"
import {UpdateTagDto} from "./dto/update-tag.dto"
import {TagEntity} from "./tag.entity"
import {EntityTagDto} from "./dto/entity-tag.dto";

export class TagService {

    public static async getTags(userId : number) {

        const tagEntityArray = await TagEntity.findBy({userId})

        const entityTagDtoArray = tagEntityArray.map((tagEntity) => {
            return new EntityTagDto(tagEntity)
        })

        return entityTagDtoArray
    }

    public static async getTag(tagId : number) {

        const tagEntity = await TagEntity.findOneBy({id: tagId})

        const entityTagDto = new EntityTagDto(tagEntity)

        return entityTagDto
    }

    public static async createTag(createTagDto : CreateTagDto) {

        const tagEntity = TagEntity.create(createTagDto as unknown as TagEntity)

        await tagEntity.save()

        const entityTagDto = new EntityTagDto(tagEntity)

        return entityTagDto

    }

    public static async updateTag(tagId : number, updateTagDto : UpdateTagDto) {

        await TagEntity.update({id: tagId}, updateTagDto)

        const tagEntity = await TagEntity.findOneBy({id: tagId})

        const entityTagDto = new EntityTagDto(tagEntity)

        return entityTagDto

    }

    public static async removeTag(tagId : number) {

        await TagEntity.delete({id : tagId})

    }

}